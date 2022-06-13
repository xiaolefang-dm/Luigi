load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("@bazel_tools//tools/build_defs/repo:utils.bzl", "maybe")
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def luigi_deps():
    """Load dependencies."""

    maybe(
        http_archive,
        name = "com_github_grpc_grpc",
        sha256 = "9647220c699cea4dafa92ec0917c25c7812be51a18143af047e20f3fb05adddc",
        strip_prefix = "grpc-1.43.0",
        url = "https://github.com/grpc/grpc/archive/refs/tags/v1.43.0.tar.gz",
    )

    maybe(
        http_archive,
        name = "bazel_skylib",
        sha256 = "f7be3474d42aae265405a592bb7da8e171919d74c16f082a5457840f06054728",
        url = "https://github.com/bazelbuild/bazel-skylib/releases/download/1.2.1/bazel-skylib-1.2.1.tar.gz",
    )

    maybe(
        http_archive,
        name = "io_grpc_grpc_java",
        sha256 = "481cdc558f25dc0677eae562b902ec86459f100e79bd9d4c9b076e20142afe73",
        strip_prefix = "grpc-java-1.43.1",
        url = "https://github.com/grpc/grpc-java/archive/refs/tags/v1.43.1.tar.gz",
    )

    maybe(
        http_archive,
        name = "rules_jvm_external",
        sha256 = "cd1a77b7b02e8e008439ca76fd34f5b07aecb8c752961f9640dea15e9e5ba1ca",
        strip_prefix = "rules_jvm_external-4.2",
        url = "https://github.com/bazelbuild/rules_jvm_external/archive/4.2.zip",
    )
